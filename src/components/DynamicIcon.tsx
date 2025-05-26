import { JSX } from 'react';
import * as SolidIcons from '@heroicons/react/24/outline';
import * as OutlineIcons from '@heroicons/react/24/solid';

export type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons;

interface Props{
    icon: IconName;
    className?: string;
    outline?: boolean;
}

export const DynamicIcon = (props: Props): JSX.Element => {
    const { icon, className = 'w-6 h-6 text-gray-600', outline = false } = props;
    const Icon = outline ? OutlineIcons[icon] : SolidIcons[icon];

    return <Icon className={className} />;
}