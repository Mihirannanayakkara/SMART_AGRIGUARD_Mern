import React from "react";
import { FaTimes, FaPlus, FaMinus, FaUser, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#F7FAFC", // Light gray background
    padding: 30,
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    color: "#2D3748", // Dark gray color
    textTransform: "uppercase",
    borderBottom: "2px solid #CBD5E0",
    paddingBottom: 10,
  },
  subheader: {
    fontSize: 20,
    marginBottom: 10,
    color: "#2B6CB0", // Blue color
    borderBottom: "1px solid #CBD5E0",
    paddingBottom: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: "#4A5568", // Dark gray color
  },
  boldText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2D3748", // Darker gray
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginTop: 10,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#EDF2F7",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 12,
    color: "#2D3748",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    backgroundColor: "#E6FFFA",
    padding: 10,
    borderRadius: 5,
  },
});

// Create PDF Document
const MyDocument = ({ cart, materials, totalPrice, customerInfo }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Invoice</Text>

      <Text style={styles.subheader}>Customer Information</Text>
      <Text style={styles.text}>Name: {customerInfo.name}</Text>
      <Text style={styles.text}>Address: {customerInfo.address}</Text>
      <Text style={styles.text}>Phone: {customerInfo.phone}</Text>

      <Text style={styles.text}>Date: {new Date().toLocaleDateString()}</Text>
      <Text style={styles.text}>
        Invoice Number: INV-{Math.floor(Math.random() * 1000000)}
      </Text>

      <View style={styles.table}>
        <View style={[styles.tableRow, { backgroundColor: "#BEE3F8" }]}>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.boldText]}>Item</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.boldText]}>Quantity</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.boldText]}>Unit Price</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell, styles.boldText]}>Total</Text>
          </View>
        </View>

        {Object.entries(cart).map(([materialId, quantity]) => {
          const material = materials.find((m) => m._id === materialId);
          return material ? (
            <View style={styles.tableRow} key={materialId}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{material.materialName}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Rs.{material.pricePerUnit.toFixed(2)}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Rs.{(material.pricePerUnit * quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ) : null;
        })}
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.boldText}>Total: Rs.{totalPrice.toFixed(2)}</Text>
      </View>

      <Text style={[styles.text, { marginTop: 20, fontStyle: "italic" }]}>
        Thank you for your business!
      </Text>
    </Page>
  </Document>
);

const Cart = ({
  showCart,
  toggleCart,
  cart,
  materials,
  handleQuantityChange,
  getTotalPrice,
  handleCheckout,
}) => {
  return (
    showCart && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-green-800">Your Cart</h2>
            <button
              onClick={toggleCart}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
          </div>
          {Object.keys(cart).length > 0 ? (
            <>
              {Object.entries(cart).map(([materialId, quantity]) => {
                const material = materials.find((m) => m._id === materialId);
                return material ? (
                  <div
                    key={materialId}
                    className="flex items-center justify-between py-2 border-b"
                  >
                    <div>
                      <h3 className="font-semibold">{material.materialName}</h3>
                      <p className="text-sm text-gray-600">
                        {material.category}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(materialId, -1)}
                        className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2"
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-2 text-sm font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(materialId, 1)}
                        className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-xs ml-2"
                      >
                        <FaPlus />
                      </button>
                      <span className="ml-4 text-sm font-bold">
                        Rs.{(material.pricePerUnit * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ) : null;
              })}
              <div className="mt-4 text-right">
                <p className="text-xl font-bold">
                  Total: Rs.{getTotalPrice().toFixed(2)}
                </p>
              </div>

              {/* Customer Information Form */}
              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">
                  Customer Information
                </h3>
                <form className="space-y-4" onSubmit={handleCheckout}>
                  <div className="flex items-center">
                    <FaUser className="text-gray-500 mr-2" />
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    required
                  />
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-gray-500 mr-2" />
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                  </div>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    required
                  ></textarea>
                  <div className="flex items-center">
                    <FaPhone className="text-gray-500 mr-2" />
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    required
                  />
                  <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-4">
                      By clicking "Download Invoice" you confirm the order with COD for the following address.
                    </p>
                    <div className="flex justify-end">
                      <PDFDownloadLink
                        document={
                          <MyDocument
                            cart={cart}
                            materials={materials}
                            totalPrice={getTotalPrice()}
                            customerInfo={{
                              name: "John Doe",
                              address: "123 Main St, Anytown, ST 12345",
                              phone: "+1 (555) 123-4567",
                            }}
                          />
                        }
                        fileName="order_invoice.pdf"
                        className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
                      >
                        {({ blob, url, loading, error }) =>
                          loading ? "Loading document..." : "Download Invoice"
                        }
                      </PDFDownloadLink>
                    </div>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <p className="text-center py-4 text-gray-600">
              Your cart is empty.
            </p>
          )}
        </div>
      </div>
    )
  );
};

export default Cart;