import { JSX } from 'react';

interface Props{
    className?: string;
}

export const BookmarkIcon = (props: Props): JSX.Element => {
    const { className = 'size-8' } = props;

    return <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        className={className}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.834 3.654c0.99 0.141 1.716 1.185 1.716 2.404V23.1L10.8 18.975 4.05 23.1V6.058c0-1.219 0.725-2.263 1.716-2.404a43.656 53.358 0 0 1 10.067 0Z"
        />
    </svg>;
}