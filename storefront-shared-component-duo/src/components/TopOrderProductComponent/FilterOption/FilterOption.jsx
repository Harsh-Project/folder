export const dropDownSortBy = [
  {
    type: "none",
    text: "Sort By",
    sort: "flits-product-count",
    label: "flits.top_ordered_products_page.none",
  },
  {
    type: "sort",
    text: "Number of order (Low to High)",
    sortType: "asc",
    sort: "flits-product-count",
    label: "flits.top_ordered_products_page.number_of_order_low_to_high",
  },
  {
    type: "sort",
    text: "Number of order (High to Low)",
    sortType: "desc",
    sort: "flits-product-count",
    label: "flits.top_ordered_products_page.number_of_order_high_to_low",
  },
  {
    type: "sort",
    text: "Sort by price (Low to High)",
    sortType: "asc",
    sort: "flits-product-price",
    label: "flits.top_ordered_products_page.sort_by_price_low_to_high",
  },
  {
    type: "sort",
    text: "Sort by price (High to Low)",
    sortType: "desc",
    sort: "flits-product-price",
    label: "flits.top_ordered_products_page.sort_by_price_high_to_low",
  },
];

export const dropDownFilter = [
  {
    type: "none",
    text: "Filter",
    sort: "flits-product-count",
    label: "flits.top_ordered_products_page.none",
  },
  {
    type: "days",
    text: "Last 30 days",
    sort: "flits-product-days-filter",
    days: "30",
    label: "flits.top_ordered_products_page.last_30_days",
  },
  {
    type: "days",
    text: "Last 60 days",
    sort: "flits-product-days-filter",
    days: "60",
    label: "flits.top_ordered_products_page.last_60_days",
  },
];
