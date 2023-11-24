const { ObjectId } = require("mongodb");

class OrderService {
    constructor(client) {
        this.Order = client.db().collection("orders");
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractOrderData(payload) {
        const order = {
			userId: payload.userId,
			name: payload.name,
			phone: payload.phone,
			address: payload.address,
			cartItems: payload.cartItems,
			notion: payload.notion,
			createAt: payload.createAt,
			startDate: payload.startDate,
			endDate: payload.endDate,
			status: payload.status,
        };
        // Remove undefined fields
        Object.keys(order).forEach(
            (key) => order[key] === undefined && delete order[key]
        );
        return order;
    }

    formatCurrentTime(minutes) {
        const currentTime = new Date(); // Lấy thời gian hiện tại
        currentTime.setMinutes(currentTime.getMinutes() + minutes); // Thêm số phút được cung cấp vào thời gian hiện tại
    
        const yyyy = currentTime.getFullYear();
        let mm = currentTime.getMonth() + 1; // Tháng bắt đầu từ 0
        let dd = currentTime.getDate();
        let hours = currentTime.getHours();
        let mins = currentTime.getMinutes();
    
        // Đảm bảo các giá trị có định dạng 2 chữ số
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        if (hours < 10) hours = '0' + hours;
        if (mins < 10) mins = '0' + mins;
    
        const formattedCurrentTime = `${dd}/${mm}/${yyyy} ${hours}:${mins}`;
        return formattedCurrentTime;
    }

    async create(payload) {
        let order = this.extractOrderData(payload);
		if (!order.cartItems) order.cartItems = [];
        const result = await this.Order.insertOne(
            order
        );
        return order;
    }

	async find(filter) {
        const cursor = await this.Order.find(filter);
        return await cursor.toArray();
    }

	async findOne(filter) {
        const cursor = await this.Order.findOne(filter);
        return cursor;
    }

    async findById(orderId) {
        return await this.Order.findOne({
			_id: ObjectId.isValid(orderId) ? new ObjectId(orderId) : null,
        });
    }

	async update(id, payload) {
		const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractOrderData(payload);
        const result = await this.Order.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
	}

    async delete(orderId) {
        const result = await this.Order.findOneAndDelete({
			_id: ObjectId.isValid(orderId) ? new ObjectId(orderId) : null,
        });
        return result.value;
    }

}

module.exports = OrderService;