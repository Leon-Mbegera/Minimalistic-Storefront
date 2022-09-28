export const fetchNavsAndCurrencies = `
{
  categories {
    name
	}
  currencies{
    label
    symbol
	}
}
`;

export const fetchCategory = (categoryName) => {
  return (`
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
    `
  )
}

export const fetchProduct = (productId) => {
  return (`
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
  `
  )
};
