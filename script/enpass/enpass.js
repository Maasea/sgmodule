var obj = JSON.parse($response.body);
obj.license = "pro";
obj.info.purchase_type = "pro";
obj.info.store="pro"
$done({ body: JSON.stringify(obj) });
