FETCH_CARDS_LIST = """
    SELECT p.id         as id
        , p.person_id   as person_id
        , p.prefix      as prefix
        , p.suffix      as suffix
        , p.translation as translation
        , w.word        as word
        , w.explanation as explanation
        -- , c.name
        -- , t.word
    FROM english_phrase as p
    INNER JOIN english_word as w
    ON p.word_id = w.id
"""