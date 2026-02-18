import React, { useState, useMemo } from "react";
import { X, ChevronDown } from "lucide-react";

// mock menu items per service
const getMenuItemsForService = (serviceName) => {
  const menuByService = {
    "Hair Styling": ["Basic Cut", "Blow Dry", "Styling", "Deep Conditioning"],
    "Hair Coloring": ["Full Color", "Highlights", "Root Touch-up", "Color Treatment"],
    "Facial Treatment": ["Cleansing", "Exfoliation", "Extraction", "Hydration Mask"],
    Manicure: ["Base Coat", "Polish", "Top Coat", "Nail Art"],
    Pedicure: ["Soak", "Scrub", "Polish", "Massage"],
    Massage: ["Swedish Massage", "Deep Tissue", "Aromatherapy", "Hot Stone"],
  };

  return menuByService[serviceName] || [];
};

const AddPaketModal = ({
  isOpen,
  onClose,
  onSave,
  services,
  editingPackage,
}) => {
  const [packageName, setPackageName] = useState(editingPackage?.name || "");
  const [packageDesc, setPackageDesc] = useState(editingPackage?.description || "");
  const [selectedServices, setSelectedServices] = useState(
    editingPackage?.services || []
  );
  const [customPrice, setCustomPrice] = useState(
    editingPackage?.finalPrice?.toString() || ""
  );
  const [expandedService, setExpandedService] = useState(null);

  const basePrice = useMemo(() => {
    return selectedServices.reduce((total, ps) => {
      const service = services.find((s) => s.id === ps.serviceId);
      return total + (service ? parseInt(service.price) : 0);
    }, 0);
  }, [selectedServices, services]);

  const handleServiceToggle = (serviceId) => {
    const exists = selectedServices.find((s) => s.serviceId === serviceId);

    if (exists) {
      setSelectedServices(
        selectedServices.filter((s) => s.serviceId !== serviceId)
      );
    } else {
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        setSelectedServices([
          ...selectedServices,
          {
            serviceId,
            serviceName: service.name,
            selectedMenuItems: [],
          },
        ]);
      }
    }
  };

  const handleMenuToggle = (serviceId, menuItem) => {
    setSelectedServices(
      selectedServices.map((ps) => {
        if (ps.serviceId === serviceId) {
          const isSelected = ps.selectedMenuItems.includes(menuItem);
          return {
            ...ps,
            selectedMenuItems: isSelected
              ? ps.selectedMenuItems.filter((m) => m !== menuItem)
              : [...ps.selectedMenuItems, menuItem],
          };
        }
        return ps;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!packageName.trim() || selectedServices.length === 0) {
      alert("Mohon isi semua field dan pilih minimal 1 layanan");
      return;
    }

    const finalPrice = customPrice ? parseInt(customPrice) : basePrice;

    const newPackage = {
      id: editingPackage?.id || Date.now().toString(),
      name: packageName,
      description: packageDesc,
      basePrice,
      finalPrice,
      duration: selectedServices.reduce((total, ps) => {
        const service = services.find((s) => s.id === ps.serviceId);
        return total + (service ? parseInt(service.duration) : 0);
      }, 0),
      services: selectedServices,
      createdAt: editingPackage?.createdAt || new Date().toISOString(),
    };

    onSave(newPackage);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setPackageName("");
    setPackageDesc("");
    setSelectedServices([]);
    setCustomPrice("");
    setExpandedService(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {editingPackage ? "Edit Paket" : "Tambah Paket Baru"}
          </h2>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* NAMA & DESKRIPSI */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Nama Paket
              </label>
              <input
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Deskripsi Paket
              </label>
              <textarea
                rows={3}
                value={packageDesc}
                onChange={(e) => setPackageDesc(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-600"
              />
            </div>
          </div>

          {/* PILIH LAYANAN */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Pilih Layanan & Menu
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto border rounded-lg p-4">
              {services.map((service) => {
                const isSelected = selectedServices.some(
                  (s) => s.serviceId === service.id
                );
                const packageService = selectedServices.find(
                  (s) => s.serviceId === service.id
                );
                const menuItems = getMenuItemsForService(service.name);
                const isExpanded = expandedService === service.id;

                return (
                  <div key={service.id}>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleServiceToggle(service.id)}
                      />

                      <div className="flex-1">
                        <div className="font-medium">{service.name}</div>
                        <div className="text-xs text-gray-600">
                          Rp{parseInt(service.price).toLocaleString("id-ID")} •{" "}
                          {service.duration} menit
                        </div>
                      </div>

                      {isSelected && menuItems.length > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedService(
                              isExpanded ? null : service.id
                            )
                          }
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {isSelected && isExpanded && (
                      <div className="ml-6 mt-2 space-y-2 border-l-2 border-amber-200 pl-3">
                        {menuItems.map((item) => (
                          <label key={item} className="flex gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={packageService?.selectedMenuItems.includes(
                                item
                              )}
                              onChange={() =>
                                handleMenuToggle(service.id, item)
                              }
                            />
                            {item}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* HARGA */}
          {selectedServices.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span>Harga Dasar</span>
                <span>Rp{basePrice.toLocaleString("id-ID")}</span>
              </div>

              <input
                type="number"
                placeholder="Harga Final (opsional)"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-amber-600">
                  Rp
                  {(customPrice
                    ? parseInt(customPrice)
                    : basePrice
                  ).toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          )}

          {/* ACTION */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="flex-1 border rounded-lg py-2"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={selectedServices.length === 0}
              className="flex-1 bg-amber-600 text-white rounded-lg py-2"
            >
              {editingPackage ? "Update Paket" : "Buat Paket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaketModal;
