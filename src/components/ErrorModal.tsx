import { Portal } from 'react-portal';
import { JSX } from 'react';

interface Props {
    error?: string;
    onClose: () => void;
}

export const ErrorModal = (props: Props): JSX.Element => {
    const { error, onClose } = props;
    
    return (
        <Portal>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
                <div className="bg-white p-4 rounded shadow-lg">
                    <h2 className="text-lg font-bold">Error</h2>
                    <p>{error ? error : "Unexpected error. Please contact God."}</p>
                    <button
                        onClick={onClose}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Close
                    </button>
                </div>
            </div>
        </Portal>
    );
}

export default ErrorModal;