import React from 'react';

const ChatPlaceHolder = () => {
    return (
        <div className="bg-gray-200 lg:h-full pt-5 lg:pt-0 pb-5 lg:pb-0 flex justify-center items-center flex-col">
            <h2 className="md:text-4xl text-2xl font-bold mb-8">GatauNamanya :(</h2>
            <div className="flex lg:flex-row flex-col">
                <div className="mr-3 ml-3 w-52">
                    <p className="md:text-2xl text-xl font-bold text-gray-700 text-center mb-2">Examples</p>
                    <div className="bg-white md:p-4 p-3 rounded-lg mt-3 mb-3">
                        <p className="md:text-base text-sm text-gray-700">Nama ibukota Indonesia</p>
                    </div>
                    <div className="bg-white md:p-4 p-3 rounded-lg mt-3 mb-3">
                        <p className="md:text-base text-sm text-gray-700">Mata kuliah IF semester 4 yang paling seru</p>
                    </div>
                    <div className="bg-white md:p-4 p-3 rounded-lg mt-3 mb-3">
                        <p className="md:text-base text-sm text-gray-700">5 + 2 * 5</p>
                    </div>
                    <div className="bg-white md:p-4 p-3 rounded-lg mt-3 mb-3">
                        <p className="md:text-base text-sm text-gray-700">25/02/2023 hari apa</p>
                    </div>
                </div>
                <div className="mr-3 ml-3 w-52">
                    <p className="md:text-2xl text-xl font-bold text-gray-700 text-center mb-2">Capabilities</p>
                    <div className="bg-white md:p-4 p-3 rounded-lg mt-3 mb-3">
                        <p className="md:text-base text-sm text-gray-700">Calculator, enter input queries in the form of various mathematical equations</p>
                    </div>
                    <div className="bg-white md:p-4 p-3 rounded-lg mt-3 mb-3">
                        <p className="md:text-base text-sm text-gray-700">Date, give response about the day of the date given</p>
                    </div>
                    <div className="bg-white md:p-4 p-3 rounded-lg mt-3 mb-3">
                        <p className="md:text-base text-sm text-gray-700">Database questions, add your own questions and answers to the database with queries</p>
                    </div>
                </div>
                <div className="mr-3 ml-3 w-52">
                    <p className="md:text-2xl text-xl font-bold text-gray-700 text-center mb-2">Limitation</p>
                    <div className="bg-white md:p-4 p-3 rounded-lg mt-3 mb-3">
                        <p className="md:text-base text-sm text-gray-700">May occasionally generate incorrect answer</p>
                    </div>
                    <div className="bg-white md:p-4 p-3 rounded-lg mt-3 mb-3">
                        <p className="md:text-base text-sm text-gray-700">Limited knowledge, based on list of questions in our databases</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPlaceHolder;