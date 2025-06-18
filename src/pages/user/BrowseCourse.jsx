import { useState, useEffect } from 'react';
import { Filter, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import courseServices from '../../services/courseServices';
import CourseCard from '../../components/CourseCard';

const BrowseCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    subject: '',
    level: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'createdAt',
    order: 'desc',
    search: ''
  });

  const [showFilters, setShowFilters] = useState(false);

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'English', 'History', 'Geography', 'Economics', 'Psychology'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const sortOptions = [
    { value: 'createdAt', label: 'Newest' },
    { value: 'price', label: 'Price' },
    { value: 'title', label: 'Title' }
  ];

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      params.append('page', currentPage);
      params.append('limit', '12');

      const res = await courseServices.getAllCourses(`?${params.toString()}`);
      setCourses(res.data.courses);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [filters, currentPage]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      subject: '',
      level: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'createdAt',
      order: 'desc',
      search: ''
    });
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-2 rounded-lg transition ${
            i === currentPage
              ? 'bg-celestialBlue text-white'
              : 'bg-white/10 text-white/75 hover:bg-white/20'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-white/10 text-white/75 hover:bg-white/20 disabled:opacity-50"
        >
          <ChevronLeft size={20} />
        </button>

        {pages}

        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-white/10 text-white/75 hover:bg-white/20 disabled:opacity-50"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
        <div className="max-w-7xl mx-auto text-center py-12">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-b from-white to-gray-300 text-transparent bg-clip-text mb-4">
            Explore Courses
          </h1>
          <p className="text-white/75 text-lg">Search and filter courses to start learning</p>
        </div>

        {/* Search bar */}
        <div className="mb-6 flex justify-between items-center gap-4">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search courses by title or subject..."
            className="w-full bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg focus:border-celestialBlue focus:outline-none"
          />
        </div>

        {/* Filter button */}
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white/10 border border-africanViolet rounded-lg px-4 py-2 text-white hover:bg-white/20"
          >
            <Filter size={20} />
            Filters
            <ChevronDown size={16} className={`transition ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          <div className="text-white/75">Showing {courses.length} courses</div>
        </div>

        {showFilters && (
          <div className="bg-white/10 border border-africanViolet rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Subject */}
              <div>
                <label className="block text-white/75 font-semibold mb-2">Subject</label>
                <select
                  value={filters.subject}
                  onChange={(e) => handleFilterChange('subject', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">All</option>
                  {subjects.map((subj) => (
                    <option key={subj} value={subj} className="bg-gray-800">{subj}</option>
                  ))}
                </select>
              </div>

              {/* Level */}
              <div>
                <label className="block text-white/75 font-semibold mb-2">Level</label>
                <select
                  value={filters.level}
                  onChange={(e) => handleFilterChange('level', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Any</option>
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl} className="bg-gray-800">{lvl}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-white/75 font-semibold mb-2">Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-white/75 font-semibold mb-2">Sort</label>
                <div className="flex gap-2">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-gray-800">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filters.order}
                    onChange={(e) => handleFilterChange('order', e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="desc" className="bg-gray-800">Desc</option>
                    <option value="asc" className="bg-gray-800">Asc</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={clearFilters}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white/10 border border-africanViolet rounded-2xl p-5 animate-pulse">
                <div className="h-6 bg-white/20 rounded mb-4"></div>
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-20 bg-white/20 rounded mb-4"></div>
                <div className="h-10 bg-white/20 rounded"></div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/75 text-lg">No courses found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="mt-4 bg-celestialBlue hover:bg-africanViolet text-white px-6 py-2 rounded-lg"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course) => (
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

export default BrowseCourse;
