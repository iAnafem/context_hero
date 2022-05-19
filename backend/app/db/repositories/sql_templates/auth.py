GET_PERSON_BY_EMAIL = """
    SELECT id, nick_name, email, first_name, last_name
    FROM person
    WHERE email = :email;
"""
