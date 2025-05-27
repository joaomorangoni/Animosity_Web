import React from 'react';
import './gallery.css';

const AlternatingLayout = () => {
  const sections = [
    {
      title: 'Seção 1: Introdução',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Seção 2: Desenvolvimento',
      text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Seção 3: Conclusão',
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://via.placeholder.com/300x200',
    },
  ];

  return (
    <div className="container">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`section ${index % 2 === 0 ? 'image-right' : 'image-left'}`}
        >
          <div className="text">
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </div>
          <div className="image">
            <img src={section.image} alt={section.title} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlternatingLayout;