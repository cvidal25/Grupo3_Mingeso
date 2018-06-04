package grupo3.mingeso;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.util.StringUtils;
import grupo3.mingeso.others.CodeAnalysis;

@SpringBootApplication
public class MingesoApplication  extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(MingesoApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(MingesoApplication.class);
	}
}
