
import React from 'react';
import type { GroundingSource } from '../types';

interface SourceLinkProps {
  source: GroundingSource;
}

const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
        <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
    </svg>
);


const SourceLink: React.FC<SourceLinkProps> = ({ source }) => {
  return (
    <li className="flex items-start">
      <LinkIcon className="w-5 h-5 text-blue-400 mt-1 mr-3 flex-shrink-0" />
      <a
        href={source.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-300 hover:text-blue-200 hover:underline transition-colors break-all"
        title={source.uri}
      >
        {source.title || 'Untitled Source'}
      </a>
    </li>
  );
};

export default SourceLink;
