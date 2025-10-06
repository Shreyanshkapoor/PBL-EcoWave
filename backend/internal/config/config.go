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

// LoadConfig reads configuration from environment
func LoadConfig() *Config {
	cfg := &Config{}

	cfg.Server.Port = getEnv("PORT", "8080")

	cfg.Database.Host = getEnv("DB_HOST", "localhost")
	cfg.Database.Port = getEnv("DB_PORT", "5432")
	cfg.Database.User = getEnv("DB_USER", "postgres")
	cfg.Database.Password = getEnv("DB_PASSWORD", "password")
	cfg.Database.Name = getEnv("DB_NAME", "echowave")
	cfg.Database.SSLMode = getEnv("DB_SSLMODE", "disable")

	cfg.CORS.AllowedOrigins = []string{
		getEnv("CORS_ALLOWED_ORIGIN", "*"),
	}

	return cfg
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}

func (c *Config) GetDatabaseDSN() string {
	return fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		c.Database.Host,
		c.Database.Port,
		c.Database.User,
		c.Database.Password,
		c.Database.Name,
		c.Database.SSLMode,
	)
}
