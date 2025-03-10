
//@ts-ignore
export const Feature = ({ title, subtitle, icon }) => {
    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="text-lg font-semibold text-center">{title}</h3>
            <p className="text-gray-600 text-center text-sm mt-1">{subtitle}</p>
        </div>
    )
}