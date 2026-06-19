variable "vpc_id" {}
variable "public_subnets" { type = list(string) }
variable "private_subnets" { type = list(string) }
variable "alb_security_group_id" {}
variable "ecs_security_group_id" {}
variable "task_execution_role_arn" {}
variable "task_role_arn" {}
variable "environment" {}
variable "container_image" {}
variable "db_host" {}
variable "db_name" {}
variable "db_username" {}
variable "db_password" {}
variable "aws_region" {}
