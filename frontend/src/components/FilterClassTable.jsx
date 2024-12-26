import React, {useState} from 'react';
import SearchBar from './SearchBar';
import ClassTable from './ClassTable';

function FilterClassTable({ classes, onSemesterChange, apiUrl }) {
  const [filterText, setFilterText] = useState('');
  const [onlyOpen, setOnlyOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-2/12 p-4">
        <h1 className="text-2xl font-bold mb-4 ml-1">CNU Course Finder</h1>
        <SearchBar
          filterText={filterText}
          onlyOpen={onlyOpen}
          onFilterTextChange={setFilterText}
          onSemesterChange={onSemesterChange}
          onOnlyOpenChange={setOnlyOpen}
          apiUrl={apiUrl} />
      </div>

      {/* Table */}
      <div className="flex-1 p-4">
        <div className="w-full max-w-6xl mx-auto">
          <ClassTable
            classes={classes}
            filterText={filterText}
            onlyOpen={onlyOpen} />
        </div>
      </div>
    </div>
  );
}

export default FilterClassTable;