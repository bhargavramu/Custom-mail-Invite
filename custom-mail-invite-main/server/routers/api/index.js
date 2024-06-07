const api = require("express").Router();
const authApiRequest = require("./middleware/authApiRequest");
const Shop = require("../../models/shop");
const cron = require("node-cron");

//api authentication
//api.use(authApiRequest);

// function scheduler() {

// const job = cron.schedule(
//   "*/1 * * * *",
//   async function customers() {
//     // const newShop12 = "shreesports";
//     // console.log("newShop12", newShop12);

//     //const request = req.params.object;
//     const newAccess = await Shop.findOne(
//       {},
//       {
//         accessToken: 1,
//         _id: 0,
//         shop: 1,
//       }
//     );
//     console.log("newAccess", newAccess);
//     const newAccessToken = newAccess.accessToken;
//     console.log("newShop", newAccessToken);

//     const url1 = `https://${newAccess.shop}.myshopify.com/admin/api/2022-07/customers/search.json?query=state:disabled`;
//     console.log(url1);
//     try {
//       const results = fetch(url1, {
//         method: "GET",
//         headers: {
//           "X-Shopify-Access-Token": newAccess.accessToken,
//         },
//       })
//         .then((response) => response.json())
//         .then((json) => {
//           console.log("json", json);

//           let newCustomer = json.customers.map((item) => item.id);
//           console.log("newCustomer", newCustomer);
//           //return json;

//           const custId = newCustomer;
//           console.log("custID", custId);

//           if (custId.length > 0) {
//             for (const id of custId) {
//               const url2 = `https://${newAccess.shop}.myshopify.com/admin/api/2022-07/customers/${id}/send_invite.json`;

//               try {
//                 const results = fetch(url2, {
//                   method: "POST",
//                   headers: {
//                     "X-Shopify-Access-Token": newAccess.accessToken,
//                   },
//                   body: { customer_invite: {} },
//                 })
//                   .then((response) => response.json())
//                   .then((json) => {
//                     console.log("json12", json);
//                     return json;
//                   });
//               } catch (err) {
//                 console.log(err);
//               }
//             }
//           }
//         });
//     } catch (err) {
//       console.log(err);
//     }

//     console.log("running a task every one minutes");
//   },
//   {
//     scheduled: false,
//   }
// );

api.get("/checkShop", async (req, res) => {
  // const SHOP = req.query.shop;
  // console.log("SHOP", SHOP);

  const shopOrigin = req.query.shop;
  console.log("SO", shopOrigin);
  const newShop = shopOrigin.split(".");
  const newShop12 = newShop[0];
  console.log("newShop12", newShop12);

  Shop.findOne({ shop: newShop12 }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Result : ", docs);
      return res.send(docs);
    }
  });

  const job = cron.schedule(
    "*/1 * * * *",
    async function customers() {
      // const newShop12 = "shreesports";
      // console.log("newShop12", newShop12);

      //const request = req.params.object;
      const newAccess = await Shop.find(
        { shop: newShop12 },
        {
          accessToken: 1,
          _id: 0,
        }
      );
      console.log("newAccess", newAccess);
      const newAccessToken = newAccess[0].accessToken;
      console.log("newAccessToken", newAccessToken);

      const url1 = `https://${newShop12}.myshopify.com/admin/api/2022-07/customers/search.json?query=state:disabled`;
      console.log(url1);
      try {
        const results = fetch(url1, {
          method: "GET",
          headers: {
            "X-Shopify-Access-Token": newAccessToken,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log("json", json);

            let newCustomer = json.customers.map((item) => item.id);
            console.log("newCustomer", newCustomer);
            //return json;

            const custId = newCustomer;
            console.log("custID", custId);

            if (custId.length > 0) {
              for (const id of custId) {
                const url2 = `https://${newShop12}.myshopify.com/admin/api/2022-07/customers/${id}/send_invite.json`;

                try {
                  const results = fetch(url2, {
                    method: "POST",
                    headers: {
                      "X-Shopify-Access-Token": newAccessToken,
                    },
                    body: { customer_invite: {} },
                  })
                    .then((response) => response.json())
                    .then((json) => {
                      console.log("json12", json);
                      return json;
                    });
                } catch (err) {
                  console.log(err);
                }
              }
            }
          });
      } catch (err) {
        console.log(err);
      }

      console.log("running a task every one minutes");
    },
    {
      scheduled: false,
    }
  );

  api.post("/customersInvite", async (req, res) => {
    const newData12 = req.body.data;
    console.log("data", newData12);

    if (newData12 === false) {
      job.stop();
    } else {
      job.start();
    }
  });
});

module.exports = api;
