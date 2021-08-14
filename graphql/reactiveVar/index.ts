import { makeVar } from "@apollo/client";
import { gql } from "@apollo/client";

export const isRoleVar = makeVar<string>("");
export const GET_ROLE = gql`
  query GetRoleVar {
    isRoleVar @client
  }
`;
