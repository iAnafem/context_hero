SELECT_WORDS_TO_REVISE = """
    WITH to_revise AS (
        SELECT word_id, grade
        FROM english_grade
        WHERE person_id = {person_id}
        AND DATE(last_attempt) <  DATE(NOW())
        ORDER BY last_attempt ASC
    )
    (SELECT word_id, grade FROM to_revise WHERE grade = 10 LIMIT 5)
    UNION
    (SELECT word_id, grade FROM to_revise WHERE grade between 5 AND 9 LIMIT 15)
    UNION
    (SELECT word_id, grade FROM to_revise WHERE grade between 1 AND 4 LIMIT 50)
    LIMIT 50
"""

SELECT_NEW_WORDS = """
    SELECT id as word_id, 0 as grade 
    FROM english_word WHERE id NOT IN (
        SELECT word_id
        FROM english_grade
        WHERE person_id = {person_id}
    ) 
"""

FETCH_CARDS_LIST = """
    SELECT p.id                            AS id
        , p.person_id                      AS person_id
        , p.prefix                         AS prefix
        , p.suffix                         AS suffix
        , p.translation                    AS phrase_translation
        , w.word                           AS word
        , w.id                             AS word_id
        , CASE 
            WHEN g.grade is null THEN 0 
            ELSE g.grade 
          END                              AS grade
        , w.explanation                    AS explanation
        , c.name                           AS category
        , tr.words                         AS word_translation 
    FROM
    ({words_to_learn}) AS g
    INNER JOIN english_phrase AS p
    ON g.word_id = p.word_id
    INNER JOIN english_word AS w
    ON w.id = g.word_id
    INNER JOIN category AS c
    ON w.category_id = c.id
    INNER JOIN (
    SELECT t.eng_w_id AS eng_w_id, array_agg(rus.word) AS words
    FROM translation AS t
    INNER JOIN russian_word AS rus
    ON t.rus_w_id = rus.id
    GROUP BY t.eng_w_id
    ) AS tr
    ON w.id = tr.eng_w_id
"""


UPDATE_GRADE = """
    INSERT INTO {table_name} AS g (person_id, word_id, grade)
    VALUES ({person_id}, {word_id}, CASE WHEN {grade} = 1 THEN 10 ELSE 1 END)
    ON CONFLICT (person_id, word_id) DO UPDATE
        SET grade = CASE 
                        WHEN DATE(g.last_attempt) != DATE(NOW())
                        THEN
                            CASE 
                                WHEN g.grade = 1 AND {grade} = -1 
                                THEN 1 
                                ELSE CASE
                                        WHEN g.grade = 10 AND {grade} = 1
                                        THEN g.grade
                                        ELSE g.grade + {grade} 
                                        END
                                END
                        ELSE g.grade
                        END
    RETURNING '{lang}' AS lang, person_id, word_id, grade;
"""
