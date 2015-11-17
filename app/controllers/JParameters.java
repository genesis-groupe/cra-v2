package controllers;

import be.objectify.deadbolt.java.actions.Group;
import be.objectify.deadbolt.java.actions.Restrict;
import com.google.common.collect.Collections2;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import dto.ParameterDTO;
import http.ResponseCache;
import models.JParameter;
import org.bson.types.ObjectId;
import org.joda.time.DateTime;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import security.JDeadboltHandler;
import security.JSecurityRoles;

import javax.annotation.Nullable;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import static play.libs.Json.toJson;

/**
 * @author f.patin
 */
public class JParameters extends Controller {

    @Restrict(value = {@Group(JSecurityRoles.role_production), @Group(JSecurityRoles.role_admin)}, handler = JDeadboltHandler.class)
    @ResponseCache.NoCacheResponse
    public static Result fetch() {
        return ok(toJson(ParameterDTO.of(JParameter.all())));
    }

    @Restrict(value = {@Group(JSecurityRoles.role_production), @Group(JSecurityRoles.role_admin)}, handler = JDeadboltHandler.class)
    @ResponseCache.NoCacheResponse
    public static Result save() {
        final Form<ParameterForm> form = Form.form(ParameterForm.class).bind(request().body().asJson());
        if (form.hasErrors()) {
            return badRequest(form.errorsAsJson());
        }
        final ParameterForm parameterForm = form.get();
        JParameter.update(parameterForm.to());
        return created();
    }

    public static class ParameterForm {
        public ObjectId id;
        public Long startDate;
        public Long endDate;
        public Map<Integer, String> car;
        public Map<Integer, String> motorcycle;
        public String zoneAmount;

        public JParameter to() {
            final JParameter p = new JParameter();
            p.id = this.id;
            p.startDate = new DateTime(this.startDate);
            p.car = Maps.transformEntries(this.car, new Maps.EntryTransformer<Integer, String, BigDecimal>() {
                @Override
                public BigDecimal transformEntry(@Nullable Integer key, @Nullable String value) {
                    return new BigDecimal(car.get(key));
                }
            });
            p.motorcycle = Maps.transformEntries(this.motorcycle, new Maps.EntryTransformer<Integer, String, BigDecimal>() {
                @Override
                public BigDecimal transformEntry(@Nullable Integer key, @Nullable String value) {
                    return new BigDecimal(motorcycle.get(key));
                }
            });
            p.zoneAmount = new BigDecimal(zoneAmount);
            return p;
        }
    }
}
