import moment from "moment";

class Order {
    constructor(id, products, totalAmount, date) {
        this.id = id;
        this.products = products;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    get readableDate() {
        return moment(this.date).format('MMM Do YYYY, hh:mm');
    }
}

export default Order;
