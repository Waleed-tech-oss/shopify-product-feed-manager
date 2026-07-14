import { authenticate } from "../shopify.server";
import { handleProductCreate } from "../services/webhooks/product-create.service";

export async function action({ request }) {
  try {
    const { topic, shop, payload } =
      await authenticate.webhook(request);

    console.log("========== WEBHOOK ==========");
    console.log("Topic:", topic);

    await handleProductCreate(shop, payload);

    console.log("=============================");
/*
    webhook data? 
    function check what we have new in the coming product changes 
    we have 20 productts and suppose we create a new product then we will have 21 products. 
    We can compare the products and if product is already in the list its mean product isupdate we only update that product for that specific shop
    and run the update function. 

    21 products 

    After every 30 mins: 
    data update or not updated: 

    1- Fetch all products 
    2- Sync with all the plateforms of that specific shop. 


    as an app owner: 

    Our app is installed on multiple stores and each store have its on feed syncing plateforms 

    suppose
    1- store 1: google shopping, facebook, pinterest
    2- store 2: google shopping, facebook, pinterest, tiktok

    cron: 30 mins:
    1- fetch all products of store 1 and sync with google shopping, facebook, pinterest
    2- fetch all products of store 2 and sync with google shopping, facebook, pinterest, tiktok

*/
    return new Response(null, { status: 200 });

  } catch (error) {
    console.error(error);

    return new Response("Webhook Error", {
      status: 500,
    });
  }
}