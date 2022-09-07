var obj = JSON.parse($response.body);
obj.products = [
  {
    vendor: "apple",
    product: "DuetStudio",
    subscriptionId: 666666,
    purchaseDate: "2021-04-12T08:27:45Z",
    cancelled: false,
    expiresDate: "2099-04-19T08:27:45Z",
    inTrial: false,
  },
];
$done({ body: JSON.stringify(obj) });
