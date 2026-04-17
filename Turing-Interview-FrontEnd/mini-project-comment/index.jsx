import React, {useState} from 'react';

const users = [
  {name: 'Appasaheb', role: 'user'},
  {name: 'Dipak', role: 'admin'},
];

const mockDetails = [
  {
    id: 1,
    comment: 'Very good UI design',
    author: 'Kavita',
    status: 'approve',
  },
  {
    id: 2,
    comment: 'Needs minor improvements',
    author: 'Rahul',
    status: 'reject',
  },
  {
    id: 3,
    comment: 'Perfect accessibility support',
    author: 'Vikram',
    status: 'reject',
  },
  {id: 4, comment: 'Font size too small', author: 'Dipak', status: 'reject'},
  {
    id: 5,
    comment: 'Navigation is confusing',
    author: 'Rohan',
    status: 'reject',
  },
  {
    id: 6,
    comment: 'Great responsiveness',
    author: 'Priya',
    status: 'approve',
  },
  {
    id: 7,
    comment: 'Loading time is slow',
    author: 'Arjun',
    status: 'approve',
  },
  {
    id: 8,
    comment: 'Animations are smooth',
    author: 'Sneha',
    status: 'reject',
  },
  {
    id: 9,
    comment: 'Clean and modern layout',
    author: 'Amit',
    status: 'reject',
  },
  {
    id: 10,
    comment: 'Excellent color scheme',
    author: 'Neha',
    status: 'approve',
  },
];

export default function App() {
  const [mockData, setMockData] = useState(mockDetails || []);
  const [filterMockData, setFilterMockData] = useState(mockDetails || []);
  const [selectedRole, setSelectedRole] = useState('user');
  const [comments, setComments] = useState('');
  return (
    <div>
      {/* step 1 */}
      {users.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            setSelectedRole(item.role);
          }}
        >
          {item.name}
        </button>
      ))}
      {/* Fitler */}
      <input
        placeholder="search"
        onChange={(e) => {
          const seachText = e.target.value;
          if (!seachText) {
            setMockData(JSON.parse(JSON.stringify(filterMockData)));
          }
          const filterData = filterMockData?.filter((item) =>
            item.comment.toLowerCase().includes(seachText.toLowerCase()),
          );
          setMockData(JSON.parse(JSON.stringify(filterData)));
        }}
      />
      {/* Sort */}
      <button
        onClick={() => {
          const sortData = [...mockData].sort((a, b) =>
            a.author.localeCompare(b.author),
          );
          setMockData(sortData);
        }}
      >
        Sort by author
      </button>
      {/* step 2 */}
      {selectedRole == 'user' ? (
        <div>
          <input
            onChange={(e) => {
              const comment = e.target.value;
              setComments(comment);
            }}
          />
          <button
            onClick={() => {
              const newMockData = mockData?.concat({
                id: mockData?.length + 1,
                comment: comments,
                author: 'Appasaheb',
                status: 'pending',
              });
              setMockData(JSON.parse(JSON.stringify(newMockData)));
              setFilterMockData(JSON.parse(JSON.stringify(newMockData)));
            }}
          >
            Add comment
          </button>
          <ul>
            {mockData.map((item) => (
              <li>{item.comment + '-' + item.status + '=' + item.author}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <ul>
            {mockData.map((item, index) => (
              <li>
                {item.comment}{' '}
                <button
                  onClick={() => {
                    const newMocData = mockData?.map((e, i) => {
                      if (index == i) return {...e, status: 'approve'};
                      else return e;
                    });
                    setMockData(JSON.parse(JSON.stringify(newMocData)));
                    setFilterMockData(JSON.parse(JSON.stringify(newMocData)));
                  }}
                >
                  {item.status}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
