import { Button, Column, TextInput } from "@carbon/react";
import { Persons } from "../interfaces/Interface";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const url = "http://localhost:4000/api/person";
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allPersons, setAllPersons] = useState<Persons[]>([]);
  const [filteredPersons, setFilteredPersons] = useState<Persons[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");

        const data: Persons[] = await response.json();
        setAllPersons(data);
        setFilteredPersons(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = allPersons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    setFilteredPersons(results);
  };

  return (
    <Column sm={4} md={8} lg={8} className="search-bar" style={{ padding: "1rem" }}>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <TextInput
          placeholder="Search..."
          id="search-input"
          labelText="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="sm"
          style={{ flex: 1 }}
        />
        <Button type="submit" size="sm">
          Search
        </Button>
      </form>

      <div
        style={{
          width: "100%",
          backgroundColor: "#f0f0f0",
          maxHeight: "350px",
          overflowY: "auto",
          padding: "0.5rem",
          borderRadius: "8px",
        }}
      >
        {filteredPersons.length === 0 ? (
          <p>No results found.</p>
        ) : (
          filteredPersons.map((person) => (
            <div
              key={person.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.5rem",
                marginBottom: "0.5rem",
                backgroundColor: "#fff",
                borderRadius: "6px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={person.image || "https://via.placeholder.com/50"}
                width={50}
                height={50}
                alt={`${person.name}-image`}
                style={{ borderRadius: "50%", marginRight: "1rem" }}
              />
              <div>
                <h4 style={{ margin: 0 }}>{person.name}</h4>
                <p style={{ margin: 0 }}>{person.email}</p>
                <p style={{ margin: 0 }}>{person.phone}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </Column>
  );
};

export default SearchBar;
