import { useState, useEffect } from 'react';
import { Filter, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import mentorServices from '../../services/mentorServices';
import MentorCard from '../../components/MentorCard';

const BrowseMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters and search
  const [filters, setFilters] = useState({
    subject: '',
    minRate: '',
    maxRate: '',
    day: '',
    sortBy: 'averageRating',
    order: 'desc',
    search: '' // 👈 New search field
  });

  const [showFilters, setShowFilters] = useState(false);

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'English', 'History', 'Geography', 'Economics', 'Psychology'
  ];

  const days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const sortOptions = [
    { value: 'averageRating', label: 'Rating' },
    { value: 'hourlyRate', label: 'Price' },
    { value: 'createdAt', label: 'Newest' }
  ];

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      params.append('page', currentPage.toString());
      params.append('limit', '12');

      const response = await mentorServices.getAllMentors(`?${params.toString()}`);
      setMentors(response.data.mentors);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('Failed to fetch mentors');
      console.error('Error fetching mentors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, [filters, currentPage]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({
      subject: '',
      minRate: '',
      maxRate: '',
      day: '',
      sortBy: 'averageRating',
      order: 'desc',
      search: ''
    });
    setCurrentPage(1);
  };

  const handleBookClick = (mentor) => {
    console.log('Booking mentor:', mentor);
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
          className="p-2 rounded-lg bg-white/10 text-white/75 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={20} />
        </button>

        {pages}

        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-white/10 text-white/75 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-b from-white to-gray-300 text-transparent bg-clip-text mb-4">
            Find Your Perfect Mentor
          </h1>
          <p className="text-white/75 text-lg">
            Browse through our expert mentors and find the perfect match for your learning journey
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex justify-between items-center gap-4">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search by mentor name, subject..."
            className="w-full bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg focus:border-celestialBlue focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white/10 border border-africanViolet rounded-lg px-4 py-2 text-white hover:bg-white/20 transition"
            >
              <Filter size={20} />
              <span>Filters</span>
              <ChevronDown 
                size={16} 
                className={`transform transition ${showFilters ? 'rotate-180' : ''}`} 
              />
            </button>

            <div className="text-white/75">
              Showing {mentors.length} mentors
            </div>
          </div>

          {showFilters && (
            <div className="bg-white/10 border border-africanViolet rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Subject Filter */}
                <div>
                  <label className="block text-white/75 font-semibold mb-2">Subject</label>
                  <select
                    value={filters.subject}
                    onChange={(e) => handleFilterChange('subject', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-celestialBlue focus:outline-none"
                  >
                    <option value="">All Subjects</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject} className="bg-gray-800">{subject}</option>
                    ))}
                  </select>
                </div>

                {/* Day Filter */}
                <div>
                  <label className="block text-white/75 font-semibold mb-2">Available Day</label>
                  <select
                    value={filters.day}
                    onChange={(e) => handleFilterChange('day', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-celestialBlue focus:outline-none"
                  >
                    <option value="">Any Day</option>
                    {days.map(day => (
                      <option key={day} value={day} className="bg-gray-800">{day}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-white/75 font-semibold mb-2">Price Range ($/hour)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minRate}
                      onChange={(e) => handleFilterChange('minRate', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-celestialBlue focus:outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxRate}
                      onChange={(e) => handleFilterChange('maxRate', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-celestialBlue focus:outline-none"
                    />
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="block text-white/75 font-semibold mb-2">Sort By</label>
                  <div className="flex gap-2">
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-celestialBlue focus:outline-none"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value} className="bg-gray-800">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <select
                      value={filters.order}
                      onChange={(e) => handleFilterChange('order', e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-celestialBlue focus:outline-none"
                    >
                      <option value="desc" className="bg-gray-800">High to Low</option>
                      <option value="asc" className="bg-gray-800">Low to High</option>
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
        </div>

        {/* Mentor Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white/10 border border-africanViolet rounded-2xl p-5 animate-pulse">
                <div className="h-6 bg-white/20 rounded mb-4"></div>
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-20 bg-white/20 rounded mb-4"></div>
                <div className="h-10 bg-white/20 rounded"></div>
              </div>
            ))}
          </div>
        ) : mentors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/75 text-lg">No mentors found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="mt-4 bg-celestialBlue hover:bg-africanViolet text-white px-6 py-2 rounded-lg transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mentors.map((mentor) => (
                <MentorCard
                  key={mentor._id}
                  mentor={mentor}
                  onBookClick={handleBookClick}
                />
              ))}
            </div>
            {totalPages > 1 && renderPagination()}
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseMentor;
