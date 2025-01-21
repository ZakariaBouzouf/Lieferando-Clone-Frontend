import React from 'react';
import { Search, MapPin } from 'lucide-react';

export default function SearchFilters({
  search,
  setSearch,
  location,
  setLocation,
  filters,
  setFilters,
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search restaurants or dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* <div className="relative"> */}
        {/*   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
        {/*   <input */}
        {/*     type="text" */}
        {/*     placeholder="Enter your location..." */}
        {/*     value={location} */}
        {/*     onChange={(e) => setLocation(e.target.value)} */}
        {/*     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" */}
        {/*   /> */}
        {/* </div> */}

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.deliveryEligibility}
              onChange={(e) => setFilters(prev => ({ ...prev, deliveryEligibility: e.target.checked }))}
              className="form-checkbox text-orange-500 rounded focus:ring-orange-500"
            />
            <span>Delivery Eligibility</span>

          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.openNow}
              onChange={(e) => setFilters(prev => ({ ...prev, openNow: e.target.checked }))}
              className="form-checkbox text-orange-500 rounded focus:ring-orange-500"
            />
            <span>Open Now</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.freeDelivery}
              onChange={(e) => setFilters(prev => ({ ...prev, freeDelivery: e.target.checked }))}
              className="form-checkbox text-orange-500 rounded focus:ring-orange-500"
            />
            <span>Free Delivery</span>
          </label>
        </div>
      </div>
    </div>
  );
}
