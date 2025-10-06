package config

import (
	"fmt"
	"os"
)

type Config struct {
	Server struct {
		Port string
	}
	Database struct {
		Host     string
		Port     string
		User     string
		Password string
		Name     string
		SSLMode  string
	}
	CORS struct {
		AllowedOrigins []string
	}
}

func LoadConfig() *Config {
	cfg := &Config{}
	cfg.Server.Port = getEnv("PORT", "8080")

	cfg.Database.Host = getEnv("DB_HOST", "localhost")
	cfg.Database.Port = getEnv("DB_PORT", "5432")
	cfg.Database.User = getEnv("DB_USER", "postgres")
	cfg.Database.Password = getEnv("DB_PASS", "password")
	cfg.Database.Name = getEnv("DB_NAME", "ecowave")
	cfg.Database.SSLMode = getEnv("DB_SSLMODE", "disable")

	cfg.CORS.AllowedOrigins = []string{"http://localhost:5173"} // frontend port for Vite

	return cfg
}

// GetDatabaseDSN constructs PostgreSQL DSN string
func (c *Config) GetDatabaseDSN() string {
	return fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		c.Database.Host, c.Database.Port, c.Database.User,
		c.Database.Password, c.Database.Name, c.Database.SSLMode,
	)
}

func getEnv(key, defaultValue string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return defaultValue
}

