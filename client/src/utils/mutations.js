import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!){
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }

`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password) {
            token
            user{
                _id
                username
                email
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($book: bookInput){
        saveBook(book: $book){
            _id
            username
            savedBooks {
                authors
                description
                bookId
                title
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBool(bookId: $bookId){
            _id
            username
            email
            bookCount
            savedBooks{
                authors
                description
                bookId
                title
                image
                link
            }
        }
    }
`;