var obj = JSON.parse($response.body);
obj.license = "premium";
obj.info = {
  purchase_type: "inapp",
  store: "ios",
  id: "ENP_IAP_LTP",
  userid: "000000",
  transaction_id: "1000000000000000",
  logo: "",
};
$done({ body: JSON.stringify(obj) });
