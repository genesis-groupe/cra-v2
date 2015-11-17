package dto;

import com.google.common.base.Function;
import com.google.common.collect.Collections2;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import models.JParameter;
import org.bson.types.ObjectId;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.ser.std.StdArraySerializers;
import utils.serializer.ObjectIdSerializer;

import javax.annotation.Nullable;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * @author f.patin
 */
public class ParameterDTO {

    @JsonSerialize(using = ObjectIdSerializer.class)
    public ObjectId id;
    public Long startDate;
    public Long endDate;
    public Map<Integer, BigDecimal> car = Maps.newHashMap();
    public Map<Integer, BigDecimal> motorcycle = Maps.newHashMap();
    public String zoneAmount;
    public Boolean active;

    public static ParameterDTO of(final JParameter parameter) {
        final ParameterDTO dto = new ParameterDTO();
        dto.id = parameter.id;
        dto.startDate = parameter.startDate.getMillis();
        dto.endDate = parameter.endDate != null ? parameter.endDate.getMillis() : null;
        dto.car = Maps.newHashMap(parameter.car);
        dto.motorcycle = Maps.newHashMap(parameter.motorcycle);
        dto.zoneAmount = parameter.zoneAmount.toPlainString();
        dto.active = parameter.active;
        return dto;
    }

    public static List<ParameterDTO> of(final List<JParameter> parameters) {
        return Lists.newArrayList(Collections2.transform(parameters, new Function<JParameter, ParameterDTO>() {
            @Nullable
            @Override
            public ParameterDTO apply(@Nullable JParameter p) {
                return of(p);
            }
        }));
    }
}
