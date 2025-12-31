import { Language } from "../App";
import { X, CheckCircle, Wallet, Phone, Mail, CreditCard, Banknote, Building2, FileText, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface PaymentConfirmModalProps {
  isOpen: boolean;
  language: Language;
  amount: number;
  consumerNo: string;
  paymentType?: "pending" | "total" | "partial";
  onConfirm: () => void;
  onCancel: () => void;
}

export function PaymentConfirmModal({
  isOpen,
  language,
  amount,
  consumerNo,
  paymentType = "total",
  onConfirm,
  onCancel,
}: PaymentConfirmModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("9876543210");
  const [email, setEmail] = useState("rajesh.sharma@example.com");
  
  // Dynamic fields for different payment methods
  const [chequeNumber, setChequeNumber] = useState("");
  const [chequeDate, setChequeDate] = useState("");
  const [ddNumber, setDdNumber] = useState("");
  const [ddDate, setDdDate] = useState("");
  const [rtgsNumber, setRtgsNumber] = useState("");
  const [rtgsDate, setRtgsDate] = useState("");

  const translations = {
    mr: {
      title: "संपर्क माहिती पुष्टी",
      consumerNo: "ग्राहक क्र.",
      amount: "रक्कम",
      paymentMethod: "पेमेंट पद्धत",
      paymentMethodLabel: "पेमेंट पद्धत निवडा",
      cash: "रोख",
      cheque: "चेक",
      dd: "DD",
      rtgs: "RTGS",
      mobileNumber: "मोबाईलचा नंबर",
      emailAddress: "ई-मेल पत्ता",
      chequeNumber: "चेक क्र.",
      chequeDate: "चेक तारीख",
      ddNumber: "DD क्र.",
      ddDate: "DD तारीख",
      rtgsNumber: "RTGS संदर्भ क्र.",
      rtgsDate: "RTGS तारीख",
      chequeNumberPlaceholder: "चेक क्रमांक प्रविष्ट करा",
      ddNumberPlaceholder: "DD क्रमांक प्रविष्ट करा",
      rtgsNumberPlaceholder: "RTGS संदर्भ क्र. प्रविष्ट करा",
      termsConditions: "मी नियम व शर्ती मान्य करतो",
      cancel: "रद्द करा",
      proceed: "पुढे जा",
    },
    hi: {
      title: "संपर्क जानकारी पुष्टि",
      consumerNo: "ग्राहक क्र.",
      amount: "रक्कम",
      paymentMethod: "भुगतान पद्धति",
      paymentMethodLabel: "भुगतान पद्धति चुनें",
      cash: "रोख",
      cheque: "चेक",
      dd: "DD",
      rtgs: "RTGS",
      mobileNumber: "मोबाइल नंबर",
      emailAddress: "ईमेल पता",
      chequeNumber: "चेक क्र.",
      chequeDate: "चेक तारीख",
      ddNumber: "DD क्र.",
      ddDate: "DD तारीख",
      rtgsNumber: "RTGS संदर्भ क्र.",
      rtgsDate: "RTGS तारीख",
      chequeNumberPlaceholder: "चेक क्रमांक दर्ज करें",
      ddNumberPlaceholder: "DD क्रमांक दर्ज करें",
      rtgsNumberPlaceholder: "RTGS संदर्भ क्र. दर्ज करें",
      termsConditions: "मैं सूची और शर्तें स्वीकार करता हूं",
      cancel: "रद्द करें",
      proceed: "आगे बढ़ें",
    },
    en: {
      title: "Contact Information Confirmation",
      consumerNo: "Consumer No.",
      amount: "Amount",
      paymentMethod: "Payment Method",
      paymentMethodLabel: "Select Payment Method",
      cash: "Cash",
      cheque: "Cheque",
      dd: "DD",
      rtgs: "RTGS",
      mobileNumber: "Mobile Number",
      emailAddress: "Email Address",
      chequeNumber: "Cheque No.",
      chequeDate: "Cheque Date",
      ddNumber: "DD No.",
      ddDate: "DD Date",
      rtgsNumber: "RTGS Reference No.",
      rtgsDate: "RTGS Date",
      chequeNumberPlaceholder: "Enter Cheque Number",
      ddNumberPlaceholder: "Enter DD Number",
      rtgsNumberPlaceholder: "Enter RTGS Reference Number",
      termsConditions: "I agree to terms and conditions",
      cancel: "Cancel",
      proceed: "Proceed",
    },
  };

  const t = translations[language];

  const paymentMethods = [
    { 
      id: "cash", 
      label: t.cash, 
      icon: CreditCard,
      color: "#4CAF50",
      bgColor: "#E8F5E9"
    },
    { 
      id: "cheque", 
      label: t.cheque, 
      icon: FileText,
      color: "#9C27B0",
      bgColor: "#F3E5F5"
    },
    { 
      id: "dd", 
      label: t.dd, 
      icon: Banknote,
      color: "#757575",
      bgColor: "#F5F5F5"
    },
    { 
      id: "rtgs", 
      label: t.rtgs, 
      icon: Building2,
      color: "#2196F3",
      bgColor: "#E3F2FD"
    },
  ];

  const selectedMethod = paymentMethods.find(m => m.id === selectedPaymentMethod);

  const handleProceed = () => {
    onConfirm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#33A1FD] px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Wallet className="w-5 h-5 text-white" />
                  <h3 
                    className="text-white text-base"
                    style={{
                      fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 600
                    }}
                  >
                    {t.title}
                  </h3>
                </div>
                <button
                  onClick={onCancel}
                  className="text-white hover:bg-white/20 rounded-lg p-1.5 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                {/* Info Box */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span 
                      className="text-gray-600 text-sm"
                      style={{
                        fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      {t.consumerNo}
                    </span>
                    <span 
                      className="text-gray-900 text-base"
                      style={{
                        fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 700
                      }}
                    >
                      {consumerNo}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span 
                      className="text-gray-600 text-sm"
                      style={{
                        fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      {t.amount}
                    </span>
                    <span 
                      className="text-[#33A1FD] text-lg"
                      style={{
                        fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 700
                      }}
                    >
                      ₹{amount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Payment Method Dropdown */}
                <div className="space-y-2">
                  <label 
                    className="flex items-center gap-2 text-gray-700 text-sm"
                    style={{
                      fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 500
                    }}
                  >
                    <CreditCard className="w-4 h-4 text-[#33A1FD]" />
                    {t.paymentMethod} <span className="text-red-500">*</span>
                  </label>
                  
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowPaymentDropdown(!showPaymentDropdown)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white hover:border-[#33A1FD] transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        {selectedMethod && (
                          <div 
                            className="w-8 h-8 rounded flex items-center justify-center"
                            style={{ backgroundColor: selectedMethod.bgColor }}
                          >
                            <selectedMethod.icon 
                              className="w-4 h-4" 
                              style={{ color: selectedMethod.color }}
                            />
                          </div>
                        )}
                        <span 
                          className="text-gray-900 text-sm"
                          style={{
                            fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                            fontWeight: 500
                          }}
                        >
                          {selectedMethod?.label}
                        </span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showPaymentDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {showPaymentDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden"
                        >
                          <div 
                            className="px-3 py-2 bg-gray-50 border-b text-xs text-gray-600"
                            style={{
                              fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                              fontWeight: 500
                            }}
                          >
                            {t.paymentMethodLabel}
                          </div>
                          {paymentMethods.map((method) => (
                            <button
                              key={method.id}
                              onClick={() => {
                                setSelectedPaymentMethod(method.id);
                                setShowPaymentDropdown(false);
                              }}
                              className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-50 transition-colors ${
                                selectedPaymentMethod === method.id ? 'bg-blue-50' : ''
                              }`}
                            >
                              <div 
                                className="w-8 h-8 rounded flex items-center justify-center"
                                style={{ backgroundColor: method.bgColor }}
                              >
                                <method.icon 
                                  className="w-4 h-4" 
                                  style={{ color: method.color }}
                                />
                              </div>
                              <span 
                                className="text-gray-900 text-sm"
                                style={{
                                  fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                                  fontWeight: 500
                                }}
                              >
                                {method.label}
                              </span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <label 
                    className="flex items-center gap-2 text-gray-700 text-sm"
                    style={{
                      fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 500
                    }}
                  >
                    <Phone className="w-4 h-4 text-[#33A1FD]" />
                    {t.mobileNumber} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm"
                    style={{
                      fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 500
                    }}
                    readOnly
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label 
                    className="flex items-center gap-2 text-gray-700 text-sm"
                    style={{
                      fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 500
                    }}
                  >
                    <Mail className="w-4 h-4 text-[#33A1FD]" />
                    {t.emailAddress} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm"
                    style={{
                      fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                      fontWeight: 500
                    }}
                    readOnly
                  />
                </div>

                {/* Dynamic Fields for Payment Methods */}
                {selectedPaymentMethod === "cheque" && (
                  <div className="space-y-2">
                    <label 
                      className="flex items-center gap-2 text-gray-700 text-sm"
                      style={{
                        fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      <FileText className="w-4 h-4 text-[#33A1FD]" />
                      {t.chequeNumber} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={chequeNumber}
                      onChange={(e) => setChequeNumber(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm"
                      style={{
                        fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500
                      }}
                      placeholder={t.chequeNumberPlaceholder}
                    />
                  </div>
                )}
                {selectedPaymentMethod === "cheque" && (
                  <div className="space-y-2">
                    <label 
                      className="flex items-center gap-2 text-gray-700 text-sm"
                      style={{
                        fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      <FileText className="w-4 h-4 text-[#33A1FD]" />
                      {t.chequeDate} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={chequeDate}
                      onChange={(e) => setChequeDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm"
                      style={{
                        fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500
                      }}
                    />
                  </div>
                )}
                {selectedPaymentMethod === "dd" && (
                  <div className="space-y-2">
                    <label 
                      className="flex items-center gap-2 text-gray-700 text-sm"
                      style={{
                        fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      <Banknote className="w-4 h-4 text-[#33A1FD]" />
                      {t.ddNumber} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={ddNumber}
                      onChange={(e) => setDdNumber(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm"
                      style={{
                        fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500
                      }}
                      placeholder={t.ddNumberPlaceholder}
                    />
                  </div>
                )}
                {selectedPaymentMethod === "dd" && (
                  <div className="space-y-2">
                    <label 
                      className="flex items-center gap-2 text-gray-700 text-sm"
                      style={{
                        fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      <Banknote className="w-4 h-4 text-[#33A1FD]" />
                      {t.ddDate} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={ddDate}
                      onChange={(e) => setDdDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm"
                      style={{
                        fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500
                      }}
                    />
                  </div>
                )}
                {selectedPaymentMethod === "rtgs" && (
                  <div className="space-y-2">
                    <label 
                      className="flex items-center gap-2 text-gray-700 text-sm"
                      style={{
                        fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      <Building2 className="w-4 h-4 text-[#33A1FD]" />
                      {t.rtgsNumber} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={rtgsNumber}
                      onChange={(e) => setRtgsNumber(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm"
                      style={{
                        fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500
                      }}
                      placeholder={t.rtgsNumberPlaceholder}
                    />
                  </div>
                )}
                {selectedPaymentMethod === "rtgs" && (
                  <div className="space-y-2">
                    <label 
                      className="flex items-center gap-2 text-gray-700 text-sm"
                      style={{
                        fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      <Building2 className="w-4 h-4 text-[#33A1FD]" />
                      {t.rtgsDate} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={rtgsDate}
                      onChange={(e) => setRtgsDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm"
                      style={{
                        fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                        fontWeight: 500
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 pb-5 flex gap-3">
                <Button
                  onClick={onCancel}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all h-11 rounded-lg"
                  style={{
                    fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                    fontWeight: 500
                  }}
                >
                  {t.cancel}
                </Button>
                <Button
                  onClick={handleProceed}
                  className="flex-1 bg-[#4CAF50] hover:bg-[#43A047] text-white shadow-md hover:shadow-lg transition-all h-11 rounded-lg"
                  style={{
                    fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
                    fontWeight: 600
                  }}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {t.proceed}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}