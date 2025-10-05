package com.example.books_backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final BookRepository bookRepository;

    public DataLoader(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public void run(String... args) {
        if (bookRepository.count() == 0) {
            bookRepository.saveAll(List.of(
                    new BookBuilder("The Secret History", "Donna Tartt",
                            "A dark psychological thriller about a group of classics students at an elite college who commit murder.",
                            List.of("thriller", "psychological", "university")),
                    new BookBuilder("The Little Friend", "Donna Tartt",
                            "A Southern Gothic tale about a young girl investigating her brother’s mysterious death.",
                            List.of("southern", "gothic", "mystery")),
                    new BookBuilder("In the Woods", "Tana French",
                            "A detective investigates a child’s murder that might be connected to his own past trauma.",
                            List.of("detective", "irish", "crime")),
                    new BookBuilder("The Likeness", "Tana French",
                            "A woman detective assumes the identity of a murder victim who looks exactly like her.",
                            List.of("identity", "thriller", "mystery")),
                    new BookBuilder("Gone Girl", "Gillian Flynn",
                            "A husband becomes the main suspect when his wife goes missing on their fifth anniversary.",
                            List.of("thriller", "marriage", "crime")),
                    new BookBuilder("Sharp Objects", "Gillian Flynn",
                            "A journalist returns to her hometown to cover a series of murders — and confront her own demons.",
                            List.of("psychological", "mystery", "family")),
                    new BookBuilder("Big Little Lies", "Liane Moriarty",
                            "A murder at a school fundraiser exposes the dark secrets of suburban mothers.",
                            List.of("drama", "mystery", "feminism")),
                    new BookBuilder("The Girl on the Train", "Paula Hawkins",
                            "An unreliable narrator witnesses something shocking from a train window.",
                            List.of("thriller", "suspense", "mystery")),
                    new BookBuilder("The Widow", "Fiona Barton",
                            "A woman faces the truth about her husband after he is accused of a terrible crime.",
                            List.of("domestic", "thriller", "psychological")),
                    new BookBuilder("Before I Go to Sleep", "S. J. Watson",
                            "A woman wakes up every day with no memory and begins to uncover terrifying secrets about her life.",
                            List.of("memory", "thriller", "suspense"))
            ).stream().map(BookBuilder::build).toList());
        }
    }

    // 🔧 вспомогательный билдер для удобства
    private static class BookBuilder {
        private final Book book;
        public BookBuilder(String title, String author, String description, List<String> tags) {
            book = new Book();
            book.setTitle(title + " — " + author);
            book.setDescription(description);
            book.setTags(tags);
        }
        public Book build() {
            return book;
        }
    }
}
