import { render, screen } from "@testing-library/react";
import MovieGrid from ".";

describe("MovieGrid Component", () => {
  const mockMovies = [
    { title: "Movie 1", imageUrl: "image1.jpg" },
    { title: "Movie 2", imageUrl: "image2.jpg" },
    { title: "Movie 3", imageUrl: "image3.jpg" },
  ];

  it("renders the correct number of MovieCards", () => {
    render(<MovieGrid movies={mockMovies} fetching={false} />);
    
    const movieTitles = screen.getAllByRole("heading");
    expect(movieTitles).toHaveLength(mockMovies.length);
  });

  it("displays correct movie titles", () => {
    render(<MovieGrid movies={mockMovies} fetching={false} />);
    
    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });

  it("shows the Spinner when fetching is true", () => {
    render(<MovieGrid movies={mockMovies} fetching={true} />);
    
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("does not show the Spinner when fetching is false", () => {
    render(<MovieGrid movies={mockMovies} fetching={false} />);
    
    expect(screen.queryByTestId("spinner")).toBeNull();
  });

  it("renders correctly when movie list is empty", () => {
    render(<MovieGrid movies={[]} fetching={false} />);
    
    // Ensure no movie cards are rendered
    expect(screen.queryByRole("heading", { level: 2 })).toBeNull();
    
    // Ensure no spinner is shown
    expect(screen.queryByTestId("spinner")).toBeNull();
  });
});
