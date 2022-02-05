pragma solidity ^0.5.0;

contract Marketplace {
    // State variables, these live on the blockchain
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "Dapp University Marketplace";
    }

    function createProduct(string memory _name, uint _price) public {
        // Require a valid name
        require(bytes(_name).length > 0); // bytes checks if there's data inside the string
        // Require a valid price
        require(_price > 0);
        // Increment product count
        productCount++;
        // Create the product
        products[productCount] = Product(productCount, _name, _price, msg.sender, false);
        // Trigger an event
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }

    // Function needs to be payable in order to accept ETH
    function purchaseProduct(uint _id) public payable {
        // Fetch the product
        Product memory _product = products[_id]; // We fetch the product from the mapping and create a new copy of it in memory
        // Fetch the owner, seller address needs to be payable as well
        address payable _seller = _product.owner;
        // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
        //Require that the product has not already been purchased
        require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _product.owner = msg.sender; // msg.sender is the person calling the function, in this case it will be the buyer calling this function
        // Mark as purchased
        _product.purchased = true;
        // Update the product in the mapping
        products[_id] = _product;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);

        // Trigger an event
        emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, _product.purchased);
    }
}