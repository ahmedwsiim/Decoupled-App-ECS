terraform {
  backend "s3" {
    bucket = "monolith-tf-state-tsk21"
    key    = "prod/terraform.tfstate"
    region = "eu-north-1"
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_ecr_repository" "backend" {
  name                 = "${var.environment}-notes-backend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }
}

module "networking" {
  source               = "../../modules/networking"
  vpc_cidr             = var.vpc_cidr
  public_subnets_cidr  = var.public_subnets_cidr
  private_subnets_cidr = var.private_subnets_cidr
  db_subnets_cidr      = var.db_subnets_cidr
  azs                  = var.azs
  environment          = var.environment
}

module "security" {
  source      = "../../modules/security"
  vpc_id      = module.networking.vpc_id
  environment = var.environment
}

module "database" {
  source                 = "../../modules/database"
  db_subnet_group_name   = module.networking.db_subnet_group_name
  vpc_security_group_ids = [module.security.rds_sg_id]
  db_name                = var.db_name
  db_username            = var.db_username
  db_password            = var.db_password
  environment            = var.environment
}

module "compute" {
  source                   = "../../modules/compute"
  vpc_id                   = module.networking.vpc_id
  public_subnets           = module.networking.public_subnets
  private_subnets          = module.networking.private_subnets
  alb_security_group_id    = module.security.alb_sg_id
  ecs_security_group_id    = module.security.ecs_sg_id
  task_execution_role_arn  = module.security.ecs_task_execution_role_arn
  task_role_arn            = module.security.ecs_task_role_arn
  environment              = var.environment
  container_image          = var.container_image
  db_host                  = module.database.db_endpoint
  db_name                  = var.db_name
  db_username              = var.db_username
  db_password              = var.db_password
  aws_region               = var.aws_region
}
