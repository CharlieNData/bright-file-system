import "./App.scss";
import File from "./File";
import Folder from "./Folder";
import data from "./files.json";

import { useState } from "react";

function App() {
  const [input, setInput] = useState('');
  const [currentDir, setDir] = useState(data);

  const handleSearchInputChange = (e) => {
    const newInput = e.target.value;
    setInput(newInput.toLowerCase());
  }

  const handleDirChange = (files) => {
    setDir(files);
  }

  const displayRootButton = () => {
    if (
      !currentDir.every((f) => { return data.indexOf(f) >= 0})
    ) {
      return (
        <button
          className="file-system__button--reset" 
          onClick={() => handleDirChange(data)}
        >
          Return to root folder
        </button>
      )
    }
  }

  const sortFiles = (property) => {
    const sortedDir = [...currentDir].sort((a, b) => {
      if (a[property] > b[property]) return 1;
      else if (a[property] < b[property]) return -1;
      else return 0;
    });
    setDir(sortedDir);
  }

  return (
    <div className="file-system">
      <h1 className="file-system__heading">File System</h1>
      <input 
        className='file-system__search-input' 
        onChange={handleSearchInputChange}
        placeholder='Search filename...'
        type='text' 
      />
      <table className='file-system__file-list' cellSpacing='0'>
        <thead>
          <tr>
            <th onClick={() => sortFiles('name')}>Name</th>
            <th onClick={() => sortFiles('type')}>File Type</th>
            <th onClick={() => sortFiles('added')}>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {currentDir.filter(
            (f) => { 
              return f.name.toLowerCase().includes(input) 
            }
            )
            .map((f, i) => {
              if (f.type === 'folder') {
                return (
                  <Folder
                    key={i}
                    name={f.name}
                    type={f.type}
                    added={f.added}
                    onClick={() => handleDirChange(f.files)}
                  />
                )
              } else return (
                <File
                  key={i} 
                  name={f.name} 
                  type={f.type} 
                  added={f.added}
                />
              );
            }
          )}
        </tbody>
      </table>
      {displayRootButton()}
    </div>
  );
}

export default App;
