// ModalConfirmacion.tsx
interface Props {
  mensaje: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export default function ModalConfirmacion({ mensaje, onConfirmar, onCancelar }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-slate-500/50 p-5">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">¿Estás seguro?</h2>
        <p className="text-gray-600 dark:text-gray-300">{mensaje}</p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onCancelar}
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}