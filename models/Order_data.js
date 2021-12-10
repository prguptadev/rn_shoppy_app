import moment from "moment";
class OrderData {
  constructor(id, items, total_amt, date) {
    (this.id = id),
      (this.items = items),
      (this.total_amt = total_amt),
      (this.date = date);
  }

  get readableDate() {
    // return this.date.toLocaleDateString("en-EN", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    // });
    return moment(this.date).format("MMMM Do YYYY,hh:mm");
  }
}

export default OrderData;
