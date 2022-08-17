data seeding json:
```txt
-catagories.json
-user.json << minimal untuk role admin
-profile.json << minimal untuk role admin
```

seeder:
```txt
-catagories.json
-user.json << minimal untuk role admin
-profile.json << minimal untuk role admin
```

migrasi:
```txt
-untuk table users
-untuk table products
-untuk table categories
-untuk table profile
-custom migration (AS PER REQUIREMENT)
```

models:
```txt
users
products
categories
profile
```

router
app
controller

endpoint (plan):
```txt
get     /                               landing page
get     /regis                          form regis user
post    /regis                          create user (redirect /)
get     /login                          form login user
post    /login                          login as per defined userID
get     /user/:userid/profile           form profile
post    /user/:userid/profile           create profile 
get     /product                        list product
get     /product/category/:categoryid   list product per category
get     /product/user/:userId           list product per user
get     /addProduct                     form add product
post    /addProduct                     create new product>>> MVP:generate qrcode
get     /deleteProduct                  delete product
```

