variable "aws_region" {
  default = "eu-north-1"
}

variable "environment" {
  default = "prod"
}

variable "vpc_cidr" {
  default = "10.0.0.0/16"
}

variable "public_subnets_cidr" {
  type    = list(string)
  default = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnets_cidr" {
  type    = list(string)
  default = ["10.0.10.0/24", "10.0.11.0/24"]
}

variable "db_subnets_cidr" {
  type    = list(string)
  default = ["10.0.20.0/24", "10.0.21.0/24"]
}

variable "azs" {
  type    = list(string)
  default = ["eu-north-1a", "eu-north-1b"]
}

variable "db_name" {
  default = "notesdb"
}

variable "db_username" {
  default = "notesadmin"
}

variable "db_password" {
  description = "Password for the RDS instance"
  sensitive   = true
}

variable "container_image" {
  description = "Docker image for the backend ECS task"
  default     = "nginx:latest" # Placeholder, update to actual ECR image URI later
}
