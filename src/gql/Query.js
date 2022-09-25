import { gql } from "@apollo/client";

export const fetchNavs = gql`
{
  categories {
    name
	}
}
`;

export const fetchCurrencies = gql`
{
  currencies{
    label
    symbol
	}
}
`;

export const fetchCategory  = (categoryName) => {
  return gql`
  {
    category(input: { title: "${categoryName}" }) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
  `;
}

export const fetchProduct = (productId) => {
  return gql`
    {
      product(id: "${productId}") {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  `;
};
