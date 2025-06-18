import { useState, useEffect } from 'react';
import { Filter, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import courseService from '../../services/courseService'; // adjust the path
import CourseCard from '../../components/CourseCard'; // your custom component

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    subject: '',
    minPrice: '',
    maxPrice: '',
    level: '',
    search: '',
    sortBy: 'createdAt',
    order: 'desc'
  });

  const [showFilters, setShowFilters] = useState(false);

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const subjects = ['Math', 'Science', 'CS', 'English', 'Art']; // update per your backend

  const sortOptions = [
    { value: 'createdAt', label: 'Newest' },
    { value: 'price', label: 'Price' },
    { value: 'rating', label: 'Rating' }
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, val]) => {
          if (val) params.append(key, val);
        });

        params.append('page', currentPage);
        params.append('limit', 12);

        const res = await courseService.getAllCourses(`?${params.toString()}`);
        setCourses(res.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
        setError('Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [filters, currentPage]);

  const handleFilterChange = (key, val) => {
    setFilters(prev => ({ ...prev, [key]: val }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      subject: '',
      minPrice: '',
      maxPrice: '',
      level: '',
      search: '',
      sortBy: 'createdAt',
      order: 'desc'
    });
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible) start = Math.max(1, end - maxVisible + 1);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-2 rounded-lg ${
            i === currentPage
              ? 'bg-celestialBlue text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        {pages}
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
    );
  };

  if (error) return <p className="text-red-400 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-b from-offWhite to-white text-transparent bg-clip-text mb-4">
            Browse Courses
          </h1>
          <p className="text-offWhite/75 text-lg">Find the best courses to boost your skills</p>
        </div>

        {/* Search */}
        <input
          type="text"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          placeholder="Search by course title or subject..."
          className="w-full mb-6 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg focus:border-celestialBlue"
        />

        {/* Filters Toggle */}
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => setShowFilters(p => !p)}
            className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg border border-africanViolet hover:bg-white/20"
          >
            <Filter size={20} />
            Filters
            <ChevronDown className={`transition ${showFilters ? 'rotate-180' : ''}`} size={16} />
          </button>
          <div className="text-white/75">Showing {courses.length} courses</div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white/10 p-6 rounded-2xl border border-africanViolet mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Subject */}
              <div>
                <label className="text-white/75 font-semibold">Subject</label>
                <select
                  value={filters.subject}
                  onChange={(e) => handleFilterChange('subject', e.target.value)}
                  className="w-full bg-darkBlueGray text-white px-3 py-2 rounded-lg"
                >
                  <option value="">All</option>
                  {subjects.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* Level */}
              <div>
                <label className="text-white/75 font-semibold">Level</label>
                <select
                  value={filters.level}
                  onChange={(e) => handleFilterChange('level', e.target.value)}
                  className="w-full bg-darkBlueGray text-white px-3 py-2 rounded-lg"
                >
                  <option value="">All Levels</option>
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="text-white/75 font-semibold">Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="bg-darkBlueGray text-white px-3 py-2 rounded-lg w-full"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="bg-darkBlueGray text-white px-3 py-2 rounded-lg w-full"
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="text-white/75 font-semibold">Sort By</label>
                <div className="flex gap-2">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="flex-1 bg-darkBlueGray text-white px-3 py-2 rounded-lg"
                  >
                    {sortOptions.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <select
                    value={filters.order}
                    onChange={(e) => handleFilterChange('order', e.target.value)}
                    className="bg-darkBlueGray text-white px-3 py-2 rounded-lg"
                  >
                    <option value="desc">↓</option>
                    <option value="asc">↑</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={clearFilters}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="p-6 rounded-lg bg-white/10 animate-pulse h-64" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <p className="text-center text-white/75 py-10">No courses match your criteria.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map(course => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
            {totalPages > 1 && renderPagination()}
          </>
        )}
      </div>
    </div>
  );
};

export default CourseList;
