FETCH_CARDS_LIST = """
    SELECT p.id         AS id
        , p.person_id   AS person_id
        , p.prefix      AS prefix
        , p.suffix      AS suffix
        , p.translation AS phrase_translation
        , w.word        AS word
        , w.explanation AS explanation
        , c.name        AS category
        , tr.words      AS word_translation
    FROM english_phrase AS p
    INNER JOIN english_word AS w
    ON p.word_id = w.id
    INNER JOIN category AS c
    ON w.category_id = c.id
    INNER JOIN (
    SELECT t.eng_w_id as eng_w_id, array_agg(rus.word) as words
    FROM translation as t
    INNER JOIN russian_word as rus
    ON t.rus_w_id = rus.id
    group by t.eng_w_id
    ) as tr
    ON w.id = tr.eng_w_id
    LIMIT 1
"""

