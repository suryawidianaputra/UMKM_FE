export default function Address({ UserData }) {
  return (
    <div className="min-h-[30vh]">
      <div className="flex w-full justify-end">
        <button className="bg-orange-500 text-white py-[9px] px-4 rounded-sm text-sm cursor-pointer hover:bg-orange-600 mr-4">
          Tambahkan Alamat Baru
        </button>
      </div>

      <div className="mt-5 flex flex-col items-center gap-5">
        {UserData?.address?.length === 0 && (
          <h1 className="font-bold mt-5">Tidak Ada Alamat yang Terdaftar</h1>
        )}
        {UserData?.address?.map((data, i) => (
          <div className="w-[95%] bg-orange-100 p-6 rounded-2xl shadow-md">
            <h1 className="text-2xl font-semibold text-orange-500 mb-2">
              {UserData?.username}
            </h1>
            <p className="text-orange-700 text-base mb-1">62098765656</p>
            <p className="text-orange-700 text-base mb-4">
              {UserData?.username} (data?.address)
            </p>

            <p className="text-sm text-orange-600 hover:underline cursor-pointer">
              Ubah Alamat
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
