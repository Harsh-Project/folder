const { lazily } = await import("react-lazily").then((module) => ({
  lazily: module.lazily,
}));
const { FourZeroFour } = lazily(() => import("./404/404"));
const { Article } = lazily(() => import("./Article/Article"));
const { Blog } = lazily(() => import("./Blog/Blog"));
const { Captcha } = lazily(() => import("./Captcha/Captcha"));
const { Cart } = lazily(() => import("./Cart/Cart"));
const { Collection } = lazily(() => import("./Collection/Collection"));
const { ListCollections } = lazily(() =>
  import("./ListCollections/ListCollections")
);
const { Account } = lazily(() => import("./Customers/Account/Account"));
const { ActivateAccount } = lazily(() =>
  import("./Customers/ActivateAccount/ActivateAccount")
);
const { Addresses } = lazily(() => import("./Customers/Addresses/Addresses"));
const { Login } = lazily(() => import("./Customers/Login/Login"));
const { Order } = lazily(() => import("./Customers/Order/Order"));
const { Register } = lazily(() => import("./Customers/Register/Register"));
const { ResetPassword } = lazily(() =>
  import("./Customers/ResetPassword/ResetPassword")
);
const { GiftCard } = lazily(() => import("./GiftCard/GiftCard"));
const { Index } = lazily(() => import("./Index/Index"));
const { Metaobject } = lazily(() => import("./Metaobject/Metaobject"));
const { Page } = lazily(() => import("./Page/Page"));
const { Password } = lazily(() => import("./Password/Password"));
const { Policy } = lazily(() => import("./Policy/Policy"));
const { Product } = lazily(() => import("./Product/Product"));
const { Search } = lazily(() => import("./Search/Search"));

export {
  FourZeroFour,
  Article,
  Blog,
  Captcha,
  Cart,
  Collection,
  ListCollections,
  Account,
  ActivateAccount,
  Addresses,
  Login,
  Order,
  Register,
  ResetPassword,
  GiftCard,
  Index,
  Metaobject,
  Page,
  Password,
  Policy,
  Product,
  Search,
};
