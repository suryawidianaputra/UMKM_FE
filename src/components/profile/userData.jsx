import { icons } from "../../assets/assets";

export default function UserData({ UserData }) {
  return (
    <>
      <div className="lg:flex gap-6 ">
        {/* Foto Profile */}
        <div className="flex flex-col items-center border-2 p-3 rounded-xl border-gray-200">
          <div className="mb-3">
            {UserData?.profilePic ? (
              <img
                src={UserData?.profilePic}
                className="w-56 h-56 rounded-xl"
              />
            ) : (
              <div className="w-56 h-56 bg-gray-200 rounded-xl">
                <img src={icons.account} className="w-56 h-56 rounded-xl p-2" />
              </div>
            )}
          </div>
          <button className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 w-56 h-10 cursor-pointer">
            Pilih Foto
          </button>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Maks. 10MB. JPG, JPEG, PNG
          </p>
        </div>

        {/* Biodata dan Kontak */}
        <div className="flex-1 my-4 lg:my-0">
          <h3 className="font-semibold text-lg mb-2">Ubah Biodata Diri</h3>
          <div className="grid grid-cols-2 text-sm mb-4">
            <div className="text-gray-500">
              <p className="py-2">Nama:</p>
              <p className="py-2">Tanggal Lahir:</p>
              <p className="py-2">Jenis Kelamin:</p>
            </div>
            <div className="text-gray-800">
              <p className="py-2">
                {UserData?.username}
                <span className="text-orange-500 cursor-pointer ml-2">
                  Ubah
                </span>
              </p>
              <p className="py-2">
                <span className="text-orange-500 cursor-pointer hover:underline">
                  {UserData?.dateOfBirth
                    ? UserData?.dateOfBirth
                    : "Tambah Jenis Kelamin"}
                </span>
              </p>
              <p className="py-2">
                <span className="text-orange-500 cursor-pointer hover:underline">
                  {UserData?.gender ? UserData?.gender : "Tambah Jenis Kelamin"}
                </span>
              </p>
            </div>
          </div>

          <h3 className="font-semibold text-lg mb-2">Ubah Kontak</h3>
          <div className="grid grid-cols-2 gap-x-3 text-sm">
            <div className="text-gray-500">
              <p className="py-2">Email:</p>
              <p className="py-2">Nomor HP:</p>
            </div>
            <div className="text-gray-800">
              <p className="py-2">{UserData?.email}</p>
              <p className="py-2">
                <span className="text-orange-500 cursor-pointer hover:underline">
                  {UserData?.phoneNumber
                    ? UserData?.phoneNumber
                    : "Tambakan Nomer HP"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
