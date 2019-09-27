Drop database if exists bamazon;
CREATE DATABASE bamazon;
use bamazon;
drop table if exists products;
create table products (
    item_id int,
    product_name varchar(50),
    department_name varchar(50),
    cost decimal(6,2),
    stock_quantity int


);
