data seeding json:
-catagories.json
-user.json << minimal untuk role admin
-profile.json << minimal untuk role admin

seeder:
-catagories.json
-user.json << minimal untuk role admin
-profile.json << minimal untuk role admin

migrasi:
-untuk table users
-untuk table products
-untuk table categories
-untuk table profile
-custom migration (AS PER REQUIREMENT)

models:
users
products
categories
profile

router
app
controller

endpoint:
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


