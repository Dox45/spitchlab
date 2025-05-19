'use client';

import { FC } from 'react';
import { FaPhone, FaMobileAlt, FaCommentDots } from 'react-icons/fa';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { BsTelephonePlusFill } from 'react-icons/bs';

const TelephonyDiagram: FC = () => {
  return (
    <div className="relative w-full flex justify-center items-center py-20 bg-black text-white overflow-hidden">
      {/* Curved Line - Left */}
      <svg className="absolute left-0 top-20 h-60 w-40" viewBox="0 0 100 200">
        <path d="M100,0 C50,100 50,100 100,200" stroke="white" strokeWidth="2" fill="none" />
      </svg>

      <div className="space-y-6 z-10">
        {/* Top Card */}
        <div className="bg-white text-black px-6 py-4 rounded-xl shadow-lg flex gap-4 items-start max-w-sm">
          <div className="bg-[#8000ff] text-white rounded-md p-2 text-lg font-bold">S</div>
          <div>
            <h4 className="font-semibold text-md">Custom Telephony</h4>
            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing dolor</p>
          </div>
        </div>

        {/* Middle Card */}
        <div className="bg-white text-black px-6 py-4 rounded-xl shadow-lg flex gap-4 items-center max-w-sm">
          <div className="bg-gray-100 p-2 rounded-lg">
            <BsTelephonePlusFill className="text-xl" />
          </div>
          <span className="font-semibold">SIP Trunking</span>
          <HiOutlineCheckCircle className="text-green-500 ml-auto text-xl" />
        </div>

        {/* Bottom Card */}
        <div className="bg-white text-black px-6 py-4 rounded-xl shadow-lg flex justify-between items-center max-w-sm">
          <FaPhone className="text-xl text-gray-600" />
          <FaMobileAlt className="text-xl text-gray-600" />
          <FaCommentDots className="text-xl text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default TelephonyDiagram;
