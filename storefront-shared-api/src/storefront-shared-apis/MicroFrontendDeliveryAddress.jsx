import { findAddressFromHTML } from "../Extractor/findAddressFromHTML";
import { SHOPIFYGET } from "../Services/ShopifyServices";
import { FLITSDELETE, FLITSPOST, FLITSPUT } from "../Services/FlitsServices";
export const deliveryaddress = {
  get_data: async function (pageNumber) {
    try {
      let dataAddress = [];
      const endpoint = `/account`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {
        page: pageNumber,
      };
      const isCustom = false;

      const response = await SHOPIFYGET(endpoint, param, headers, isCustom);
      let data;

      if (response && response.ok) {
        data = await response.text();
      }

      const addresses = findAddressFromHTML(data);

      if (addresses) {
        const updatedAddresses = addresses.map((address) => ({
          id: address.id,
          customer_id: address.customer_id,
          firstName: address.first_name,
          lastName: address.last_name,
          company: address.company,
          addressLine1: address.address1,
          addressLine2: address.address2,
          province: address.province,
          country: address.country,
          city: address.city,
          zip: address.zip,
          phone: address.phone,
          name: address.name,
          provinceCode: address.province_code,
          default: address.default,
          countryCode: address.country_code,
          countryName: address.countryName,
          needMark: address.default ? false : true,
        }));

        dataAddress = [...dataAddress, ...updatedAddresses];
      }
      return dataAddress;
    } catch (error) {
      console.log("productpage-microfrontend", error);
    }
  },
  delete_address: async function (id) {
    try {
      const endpoint = `/${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}/account/addresses/${id}`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {
        customer_hash:
          window?.flitsThemeAppExtensionObjects?.customer?.customer_hash,
        token: window?.flitsThemeAppExtensionObjects?.customer?.shop_token,
        _method: "DELETE",
      };

      const formData = {};

      const response = await FLITSDELETE(endpoint, formData, param, headers);
      const delete_address = await response.json();
      return delete_address;
    } catch (error) {
      console.log("delete_address", error);
    }
  },
  default_address: async function (data, id) {
    try {
      const endpoint = `/${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}/account/addresses/${id}`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {};


      const response = await FLITSPUT(endpoint, data, param, headers);
      const delete_address = await response.json();
      return delete_address;
    } catch (error) {
      console.log(error);
    }
  },
  update_address: async function (data, id) {
    try {
      const endpoint = `/${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}/account/addresses/${id}`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {};

      const response = await FLITSPUT(endpoint, data, param, headers);
      const delete_address = await response.json();
      return delete_address;
    } catch (error) {
      console.log(error);
    }
  },
  add_address: async function (data) {
    try {
      const endpoint = `/${window?.flitsThemeAppExtensionObjects?.customer?.customer_id}/account/addresses`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const param = {};


      const response = await FLITSPOST(endpoint, data, param, headers);
      const add_address = await response.json();
      return add_address;
    } catch (error) {
      console.log(error);
    }
  },
};
